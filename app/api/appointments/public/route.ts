import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendNewAppointmentNotification, sendNewAppointmentNotificationToPractice } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      appointmentTypeId,
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
      notes,
    } = body;

    // Validate required fields
    if (!appointmentTypeId || !date || !time || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Alle Pflichtfelder müssen ausgefüllt werden" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    // Get appointment type details
    const appointmentType = await prisma.appointmentType.findUnique({
      where: { id: appointmentTypeId },
    });

    if (!appointmentType || !appointmentType.isActive) {
      return NextResponse.json(
        { error: "Ungültiger Termintyp" },
        { status: 400 }
      );
    }

    // Parse date and time
    const appointmentDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    const startTime = new Date(appointmentDate);
    startTime.setHours(hours, minutes, 0, 0);

    // Calculate end time
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + appointmentType.duration);

    // Check if slot is still available
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: appointmentDate,
        status: { in: ["CONFIRMED", "PENDING"] },
      },
      include: {
        appointmentType: true,
      },
    });

    const BUFFER_TIME = 5;
    const isSlotAvailable = !existingAppointments.some((appointment: { startTime: Date; endTime: Date }) => {
      const appointmentStart = new Date(appointment.startTime);
      const appointmentEnd = new Date(appointment.endTime);
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + BUFFER_TIME);

      const requestedEndWithBuffer = new Date(endTime);
      requestedEndWithBuffer.setMinutes(requestedEndWithBuffer.getMinutes() + BUFFER_TIME);

      return startTime < appointmentEnd && requestedEndWithBuffer > appointmentStart;
    });

    if (!isSlotAvailable) {
      return NextResponse.json(
        { error: "Dieser Termin ist leider nicht mehr verfügbar. Bitte wählen Sie einen anderen Zeitpunkt." },
        { status: 409 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Create new user with random password (they can reset it later if needed)
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          address: address || null,
          role: "PATIENT",
        },
      });
    }

    // Create appointment with PENDING status (admin needs to confirm)
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        startTime,
        endTime,
        status: "PENDING",
        notes: notes || null,
        userId: user.id,
        appointmentTypeId: appointmentType.id,
      },
      include: {
        appointmentType: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    // Send email notifications
    const emailData = {
      patientName: `${user.firstName} ${user.lastName}`,
      patientEmail: user.email,
      date: appointmentDate.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: time,
      appointmentType: appointmentType.name,
    };

    // Send confirmation email to patient
    try {
      await sendNewAppointmentNotification(emailData);
    } catch (emailError) {
      console.error('Error sending patient notification email:', emailError);
      // Continue even if email fails - appointment is already created
    }

    // Send notification email to practice
    try {
      await sendNewAppointmentNotificationToPractice(emailData);
    } catch (emailError) {
      console.error('Error sending practice notification email:', emailError);
      // Continue even if email fails - appointment is already created
    }

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        type: appointment.appointmentType.name,
        patient: {
          name: `${appointment.user.firstName} ${appointment.user.lastName}`,
          email: appointment.user.email,
        },
      },
    });
  } catch (error) {
    console.error("Error creating public appointment:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}
