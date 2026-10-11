// Flagship project, kept in code so it can carry richer content than the
// admin-managed projects. Everything here must be true of the real system.

export const featuredProject = {
  slug: "5g-hotel",
  title: "5G Hotel Management System",
  subtitle: "Full-stack hotel booking and operations platform.",
  badge: "Featured \u00b7 Production system",
  // Fill these in when ready. Buttons only render when a value is present.
  liveUrl: "",
  caseStudy: false,
  story: [
    {
      label: "Problem",
      text: "A hotel needed one system for guest reservations, room availability, payments and day-to-day operations, without double bookings.",
    },
    {
      label: "Solution",
      text: "A production-ready platform where guests book and pay online, and staff manage rooms, bookings and operations from role-based dashboards.",
    },
    {
      label: "Engineering",
      text: "Specific and multi-room selection, temporary room holds, Paystack payment with webhook confirmation, unique booking codes and email confirmation.",
    },
    {
      label: "Result",
      text: "Production system used by a real hotel.",
    },
  ],
  features: [
    "Online booking",
    "Real-time room availability",
    "Specific & multi-room booking",
    "Room categories",
    "Paystack payments + webhook confirmation",
    "Unique booking codes",
    "Email confirmation",
    "Booking status management",
    "Automated stale-booking cleanup",
    "Receptionist, manager & CEO dashboards",
    "Staff clock-in / clock-out",
    "Working-hour tracking",
  ],
  tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Paystack"],
  flow: [
    { title: "Guest selects room(s)", text: "Live availability, specific rooms" },
    { title: "Rooms held", text: "Temporarily processing" },
    { title: "Paystack payment", text: "Initiated from the booking" },
    { title: "Webhook verified", text: "Payment confirmed server-side" },
    { title: "Booking confirmed", text: "Code generated, email sent" },
  ],
} as const;
