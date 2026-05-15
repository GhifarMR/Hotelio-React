import { useEffect, useMemo, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";

const navButtonClass =
  "h-9 w-9 rounded-full border border-white/15 bg-[#2b2b2b]/90 text-white shadow-md backdrop-blur-sm transition-all hover:border-yellow-400/50 hover:bg-[#363636] hover:text-yellow-400 disabled:border-white/10 disabled:bg-[#2b2b2b]/60 disabled:text-white/25 md:h-10 md:w-10";

type Review = {
  id: number;
  name: string;
  location: string;
  comment: string;
  image: string;
  hotel: string;
  address: string;
  rating: number;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Jonathan",
    location: "London",
    comment:
      "I had a pleasant stay at this hotel. The room was clean and comfortable, and the staff were friendly and helpful. The location was ideal—close to attractions and transit.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    hotel: "Great Ghifar Hotel",
    address: "Wonosobo st 41st 15689",
    rating: 5,
  },
  {
    id: 2,
    name: "Anna Grey",
    location: "Europe",
    comment:
      "Amazing service and beautiful view. I'll definitely come back again!",
    image:
      "https://plus.unsplash.com/premium_photo-1675745329378-5573c360f69f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    hotel: "Sunrise Resort",
    address: "Bandung st 52nd 23455",
    rating: 5,
  },
  {
    id: 3,
    name: "John Doe",
    location: "Asia",
    comment:
      "Comfortable room and friendly staff. The breakfast was fantastic!",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
    hotel: "Cozy Hills Hotel",
    address: "Jakarta st 88th 15600",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Maria Lopez",
    location: "South America",
    comment:
      "The hotel exceeded my expectations. Great amenities and the pool was refreshing after a long day of exploring.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
    hotel: "Ocean Breeze Inn",
    address: "Rio st 12th 78901",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Ahmed Khalil",
    location: "Middle East",
    comment:
      "Excellent hospitality and modern facilities. The rooftop view was breathtaking!",
    image:
      "https://media.istockphoto.com/id/2132093423/photo/swimming-pool-in-modern-hotel-spa-and-wellness-center.webp?a=1&b=1&s=612x612&w=0&k=20&c=B3HIA291C7ouyahvLiubtWo9YwRbHpwDBz8l1qxgJoU=",
    hotel: "Desert Palace Hotel",
    address: "Dubai st 99th 44567",
    rating: 5,
  },
  {
    id: 6,
    name: "Sophie Laurent",
    location: "France",
    comment:
      "Charming boutique hotel with authentic local cuisine. Staff made us feel like family.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
    hotel: "Parisian Charm Suites",
    address: "Eiffel Ave 23rd 75001",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Raj Patel",
    location: "India",
    comment:
      "Value for money with spacious rooms and quick service. Highly recommended for business travelers.",
    image:
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    hotel: "Mumbai Grand Hotel",
    address: "Mumbai st 45th 400001",
    rating: 4.6,
  },
  {
    id: 8,
    name: "Emily Chen",
    location: "Australia",
    comment:
      "Stunning beachfront location and eco-friendly practices. A perfect getaway!",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
    hotel: "Sydney Harbor Retreat",
    address: "Bondi Beach Rd 101 2026",
    rating: 5,
  },
];

function formatRating(rating: number) {
  const value = Number.isInteger(rating) ? rating : rating.toFixed(1);
  return `${value} stars`;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="flex h-full w-full max-w-[350px] shrink-0 flex-col gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#2b2b2b] py-0 text-white shadow-lg">
      <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        <blockquote className="text-sm leading-relaxed text-gray-300">
          &ldquo;{review.comment}&rdquo;
        </blockquote>

        <div className="mt-auto flex items-center gap-3">
          <img
            src={`https://i.pravatar.cc/100?img=${review.id + 3}`}
            alt={review.name}
            className="size-10 rounded-full object-cover ring-2 ring-white/20"
          />
          <div>
            <p className="text-sm font-medium">{review.name}</p>
            <p className="text-xs text-gray-400">{review.location}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0">
        <div className="relative w-full">
          <img
            src={review.image}
            alt={review.hotel}
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-lg font-semibold">{review.hotel}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-300">
              <MapPin className="size-3 shrink-0" />
              {review.address}
            </p>
            <Badge className="mt-2 gap-1 border-0 bg-white/15 text-white hover:bg-white/25">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {formatRating(review.rating)}
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

const ReviewPage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const carouselPlugins = useMemo(
    () => [
      WheelGesturesPlugin({
        forceWheelAxis: "x",
      }),
    ],
    []
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section
      id="reviewPage"
      className="relative bg-[#1f1f1f] px-4 py-10 text-white sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12"
    >
      <h2 className="mx-auto mb-8 max-w-3xl text-center text-2xl leading-snug font-semibold sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl md:leading-tight">
        Let&apos;s Hear How Their Experiences{" "}
        <br className="hidden sm:block" />
        Use Our Platforms
      </h2>

      <div className="relative mx-auto max-w-7xl">
        <Carousel
          opts={{ align: "start", loop: false, dragFree: true }}
          plugins={carouselPlugins}
          setApi={setApi}
          className="cursor-grab active:cursor-grabbing"
        >
          <CarouselContent className="-ml-4 sm:-ml-5 md:-ml-6">
            {REVIEWS.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-[88vw] pl-4 sm:basis-[340px] sm:pl-5 md:basis-[350px] md:pl-6"
              >
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Previous reviews"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
          className={cn(
            navButtonClass,
            "absolute top-1/2 -left-1 z-10 hidden -translate-y-1/2 md:inline-flex lg:-left-3"
          )}
        >
          <ChevronLeft className="size-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Next reviews"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
          className={cn(
            navButtonClass,
            "absolute top-1/2 -right-1 z-10 hidden -translate-y-1/2 md:inline-flex lg:-right-3"
          )}
        >
          <ChevronRight className="size-5" />
        </Button>

        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Previous reviews"
            disabled={!canScrollPrev}
            onClick={() => api?.scrollPrev()}
            className={navButtonClass}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Next reviews"
            disabled={!canScrollNext}
            onClick={() => api?.scrollNext()}
            className={navButtonClass}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;
