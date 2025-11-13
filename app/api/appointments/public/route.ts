import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendNewAppointmentNotification, sendNewAppointmentNotificationToPractice } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      appointmentTypeId,
      preferredTimeSlots,
      preferredDays,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
      notes,
      insuranceType,
      isFirstVisit,
      reasonForVisit,
    } = body;

    // Validate required fields
    if (!appointmentTypeId || !preferredTimeSlots || !preferredDays || !firstName || !lastName || !email || !phone || !insuranceType || isFirstVisit === undefined || !reasonForVisit) {
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

    // Create appointment request with PENDING status (admin will assign specific time)
    const appointment = await prisma.appointment.create({
      data: {
        date: null, // Will be set by admin
        startTime: null, // Will be set by admin
        endTime: null, // Will be set by admin
        status: "PENDING",
        notes: notes || null,
        insuranceType: insuranceType,
        isFirstVisit: isFirstVisit === 'true' || isFirstVisit === true,
        reasonForVisit: reasonForVisit,
        preferredTimeSlots: preferredTimeSlots,
        preferredDays: preferredDays,
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
    const preferredTimeSlotsText = Array.isArray(appointment.preferredTimeSlots)
      ? appointment.preferredTimeSlots.join(", ")
      : (appointment.preferredTimeSlots || "Keine Präferenz angegeben");

    const preferredDaysText = Array.isArray(appointment.preferredDays)
      ? appointment.preferredDays.join(", ")
      : (appointment.preferredDays || "Keine Präferenz angegeben");

    const emailData = {
      patientName: `${appointment.user.firstName} ${appointment.user.lastName}`,
      patientEmail: appointment.user.email,
      date: `Präferenz: ${preferredDaysText}`,
      time: preferredTimeSlotsText,
      appointmentType: `${appointment.appointmentType.name} (${appointment.isFirstVisit ? 'Ersttermin' : 'Folgetermin'})`,
    };

    // Send confirmation email to patient
    await sendNewAppointmentNotification(emailData);

    // Send notification to practice
    await sendNewAppointmentNotificationToPractice(emailData);

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        type: appointment.appointmentType.name,
        preferredTimeSlots: appointment.preferredTimeSlots,
        preferredDays: appointment.preferredDays,
        insuranceType: appointment.insuranceType,
        isFirstVisit: appointment.isFirstVisit,
        reasonForVisit: appointment.reasonForVisit,
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
