import { useState } from "react";
import { customerReviews } from "./data/customerReviews";

export default function CustomerReviews() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full overflow-hidden border-y border-catering-border bg-catering-cream py-12"
    >
      <div className="mx-auto mb-8 max-w-6xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-catering-muted">
          Client Testimonials
        </p>
        <h2 id="testimonials-heading" className="font-display mt-2 text-3xl font-bold text-catering-ink md:text-4xl">
          What Our Guests Say About <span className="text-catering-maroon">Sumukha Caterers</span>
        </h2>
        <p className="mt-3 text-xs text-catering-muted">Sample testimonials · Illustrative names and experiences</p>
        <button
          type="button"
          aria-pressed={isPaused}
          aria-controls="customer-reviews-track"
          onClick={() => setIsPaused((paused) => !paused)}
          className="mt-4 cursor-pointer rounded-md border border-catering-border px-4 py-2 text-xs font-semibold text-catering-maroon transition-colors hover:bg-catering-maroon/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-catering-maroon"
        >
          {isPaused ? "Resume reviews" : "Pause reviews"}
        </button>
      </div>

      <div className="reviews-viewport">
        <div id="customer-reviews-track" className="reviews-track" data-paused={isPaused}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 ? true : undefined}>
              {customerReviews.map((customer) => (
                <figure
                  key={customer.name}
                  className="review-card card-light flex w-[300px] shrink-0 flex-col justify-between rounded-2xl p-5 shadow-xs transition-shadow hover:shadow-md md:w-[340px]"
                >
                  <div>
                    <span className="mb-3 inline-block rounded-md bg-catering-maroon/10 px-2.5 py-1 text-xs font-semibold text-catering-maroon">
                      {customer.event}
                    </span>
                    <blockquote className="text-sm leading-relaxed text-catering-body italic">
                      &ldquo;{customer.review}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-catering-border pt-4">
                    <img
                      src={encodeURI(customer.avatar)}
                      alt={customer.name}
                      loading="lazy"
                      className="size-10 shrink-0 rounded-full border-2 border-catering-gold object-cover shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=7B1E1E&color=fff`;
                      }}
                    />
                    <div>
                      <p className="text-xs font-semibold leading-snug text-catering-ink">{customer.name}</p>
                      <p className="mt-1 text-xs text-catering-muted">{customer.location}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
