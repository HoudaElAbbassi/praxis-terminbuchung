'use client';

import { useState, useRef, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Swetlana Wank',
    initial: 'S',
    color: 'from-blue-500 to-blue-600',
    text: 'Herr Alyandouzi und sein Team sind nur zu empfehlen. Sie zeigen sich nicht schlecht gestimmt und sowohl Herr Alyandouzi sowie seine MitarbeiterInnen haben immer ein offenes Ohr! Ich kann nur positives berichten und bin froh zu einen kompetenten Facharzt in Remscheid gefunden zu haben.',
    date: 'vor 5 Monaten',
  },
  {
    id: 2,
    name: 'Manuela Guhlke',
    initial: 'M',
    color: 'from-green-500 to-green-600',
    text: 'Ich hatte heute meinen ersten Termin bei Dr. Abdelkarim Alyandouzi und kann ihn als Facharzt und seine Kolleg*innen nur weiterempfehlen. Untersuchung und Gespräch waren mehr als zufriedenstellend. Ich bin am Empfang mit Freundlichkeit empfangen worden und für die spätere Behandlung hat sich Dr. Alyandouzi sehr viel Zeit genommen.',
    date: 'vor einem Jahr',
  },
  {
    id: 3,
    name: 'Marlene O.',
    initial: 'M',
    color: 'from-purple-500 to-purple-600',
    text: 'Herr Alyandouzi ist ein wirklich sehr guter Arzt wie man ihn sich wünscht im Gegenteil zu vielen anderen. Er geht auf einen ein und interessiert sich auch wirklich und hilft. Auf jedenfall zu 1000% weiter zu empfehlen. Arzthelferinnen auch super super nett ❤️',
    date: 'vor einem Jahr',
  },
  {
    id: 4,
    name: 'Elke Gimpel',
    initial: 'E',
    color: 'from-orange-500 to-orange-600',
    text: 'Hatte heute meinen ersten Termin bei Hr.Alyandouzi. Habe mich sehr gut behandelt gefühlt. Die Arzthelferinnen sind super nett und freundlich. Durfte sogar ne halbe Stunde vor dem vereinbarten Termin ins Behandlungszimmer. Hr Alyandouzi hat sich viel Zeit für unser Erstgespräch genommen, ein fachlich kompetenter und sehr einfühlsamer Arzt.',
    date: 'vor 11 Monaten',
  },
  {
    id: 5,
    name: 'Big Boss',
    initial: 'B',
    color: 'from-teal-500 to-teal-600',
    text: 'Ein Arzt den man mit gutem Gewissen weiter empfehlen kann',
    date: 'vor einem Jahr',
  },
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const touchRef = useRef<HTMLDivElement>(null);

  // Auf Mobile: 1 Review, auf Desktop: 3 Reviews
  const totalReviews = reviews.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${review.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-3`}>
          {review.initial}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900">{review.name}</h4>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <svg className="w-6 h-6 text-gray-400 hidden sm:block" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">
        {review.text}
      </p>
      <p className="text-xs text-gray-500 mt-3">{review.date}</p>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12" style={{fontFamily: "'Playfair Display', serif"}}>
          Das sagen unsere <span className="text-primary-600">Patienten</span>
        </h2>

        {/* Mobile: Single Review Carousel */}
        <div className="lg:hidden relative">
          <div
            ref={touchRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden"
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-2">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg active:scale-95 transition-transform z-10"
            aria-label="Vorherige Bewertung"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg active:scale-95 transition-transform z-10"
            aria-label="Nächste Bewertung"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop: 3 Reviews Grid */}
        <div className="hidden lg:block relative">
          <div className="grid lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Dots Navigation - Shows on Mobile for all 5 reviews */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 w-2'
              }`}
              aria-label={`Zu Bewertung ${index + 1} gehen`}
            />
          ))}
        </div>

        {/* Desktop Counter */}
        <div className="hidden lg:flex justify-center items-center gap-2 mt-8">
          <span className="text-sm text-gray-600">Zeige 3 von {totalReviews} Bewertungen</span>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Echte Google-Rezensionen von zufriedenen Patienten
          </p>
        </div>
      </div>
    </section>
  );
}
