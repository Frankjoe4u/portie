// Case-study content. Only state what is true of the real system.
// Edit the text here; the page renders whatever is in this file.
import { featuredProject } from "@/data/projects";

export type GallerySlot = { file: string; title: string; caption: string };

export const fiveGHotel = {
  slug: featuredProject.slug,
  title: featuredProject.title,
  subtitle: featuredProject.subtitle,
  description:
    "Case study: a production hotel booking and operations platform with online booking, Paystack payments, role-based dashboards and staff attendance, built with Next.js, TypeScript and Supabase.",
  meta: [
    { label: "Role", value: "Full-Stack Software Engineer" },
    { label: "Type", value: "Production system" },
    { label: "Status", value: "Live, used by a real hotel" },
  ],
  overview:
    "5G Hotel Management System is a production-ready platform that handles guest reservations, room availability, payments, booking confirmation and the hotel's internal operations in one place.",
  problem: [
    "The hotel needed guests to book and pay online while the front desk kept taking bookings too, and the two had to agree at all times: a room booked either way must show as taken to the other side.",
    "Payments had to be trustworthy, every booking needed a code the guest could present at reception, and the team needed dashboards and staff attendance records for day-to-day running.",
  ],
  solution: [
    "A public booking site where guests search availability, pick specific rooms (one or several in a single booking), pay with Paystack and receive a unique booking code by email.",
    "Role-based dashboards for the receptionist, manager and CEO, plus staff clock-in and clock-out with working-hour tracking.",
  ],
  features: [
    "Online hotel booking",
    "Real-time room availability",
    "Specific room selection",
    "Multi-room booking",
    "Room categories",
    "Paystack payment processing",
    "Paystack webhook confirmation",
    "Booking confirmation",
    "Unique booking codes",
    "Email confirmation",
    "Booking status management",
    "Automated stale-booking cleanup",
    "Receptionist dashboard",
    "Manager dashboard",
    "CEO dashboard",
    "Staff clock-in and clock-out",
    "Staff working-hour tracking",
    "Hour-based payroll calculations",
    "Revenue and operational information",
  ],
  tech: [
    { name: "Next.js", role: "Public site and dashboards" },
    { name: "TypeScript", role: "End-to-end type safety" },
    { name: "Supabase", role: "Backend platform" },
    { name: "PostgreSQL", role: "Relational data" },
    { name: "Paystack", role: "Payments and webhooks" },
    { name: "Email service", role: "Booking confirmations" },
  ],
  architecture: {
    clients: ["Guest (public site)", "Receptionist", "Manager", "CEO"],
    app: ["Public booking interface", "Role-based dashboards"],
    api: [
      "Availability and room holds",
      "Booking and booking codes",
      "Payment initialisation",
      "Webhook handler",
      "Staff attendance",
    ],
    data: ["Rooms and categories", "Bookings and status", "Staff and attendance", "Users and roles"],
    external: [
      { name: "Paystack", text: "Takes payment and calls the webhook when it is confirmed" },
      { name: "Email service", text: "Sends the booking confirmation and code" },
    ],
  },
  flow: [
    "Guest searches availability",
    "Guest selects specific room(s)",
    "Booking starts",
    "Room(s) held in a temporary processing state",
    "Guest pays with Paystack",
    "Paystack verification and webhook",
    "Payment confirmed",
    "Booking created",
    "Unique booking code generated",
    "Confirmation email sent",
    "Room marked as booked",
  ],
  challenges: [
    {
      title: "Preventing double booking",
      problem:
        "Online guests and the front desk can both book at any moment, and a guest can pick specific rooms.",
      solution:
        "Rooms are held while a booking is being processed, and availability is checked against bookings from both channels so a taken room is never offered again.",
    },
    {
      title: "Handling payment verification",
      problem:
        "A guest returning from the payment page is not proof that the payment succeeded.",
      solution:
        "Booking confirmation depends on Paystack verification and the webhook, not on what the browser reports.",
    },
    {
      title: "Managing temporary booking states",
      problem:
        "Guests who start a booking and never pay would leave rooms locked.",
      solution:
        "Stale bookings are cleaned up automatically so abandoned attempts release their rooms.",
    },
    {
      title: "Synchronising room availability",
      problem:
        "The public site and the reception dashboard must show the same truth.",
      solution:
        "Both read the same booking data, so a room booked on either side shows as taken on the other.",
    },
    {
      title: "Managing multiple roles",
      problem:
        "Receptionists, managers and the CEO need different views and different powers.",
      solution:
        "Each role gets its own dashboard and access level, so people only see and do what their job needs.",
    },
    {
      title: "Designing staff attendance",
      problem:
        "The hotel needed reliable records of when staff work.",
      solution:
        "Staff clock in and out, working hours are tracked, and hour-based calculations are derived from those records.",
    },
  ],
  security: [
    {
      title: "Authentication and role-based access",
      text: "Dashboards require sign-in, and what a user can do depends on their role.",
    },
    {
      title: "Webhook verification",
      text: "Payments are confirmed from the verified Paystack webhook rather than trusted from the client.",
    },
    {
      title: "Single-use booking codes",
      text: "A booking code belongs to the person who booked and paid, and is checked at reception.",
    },
    {
      title: "Input validation",
      text: "Booking and payment input is validated on the server before it is used.",
    },
    {
      title: "Environment secrets",
      text: "API keys and credentials are kept in environment variables, not in the codebase.",
    },
  ],
  outcome: [
    "Production system used by a real hotel.",
    "Guests can book, pay and receive a confirmation code online, and staff run bookings, operations and attendance from one system.",
  ],
  lessons: [
    "Model temporary states (like a room on hold) explicitly instead of treating a room as simply free or taken.",
    "Treat the payment provider's webhook as the source of truth, never the browser.",
    "Decide roles and permissions at the start. Retrofitting them is much harder than designing for them.",
    "Automate cleanup of anything temporary, or the data slowly drifts away from reality.",
  ],
} as const;

// Drop real screenshots into public/5g-hotel/ using these base names
// (.webp, .jpg, .jpeg or .png). Missing files are skipped automatically,
// and the Screenshots section stays hidden until at least one exists.
export const gallerySlots: GallerySlot[] = [
  { file: "01-landing", title: "Public hotel landing page", caption: "The public landing page guests see first." },
  { file: "02-rooms", title: "Room selection", caption: "Choosing specific rooms from live availability." },
  { file: "03-room-details", title: "Room details", caption: "Room category, details and price." },
  { file: "04-booking", title: "Booking interface", caption: "Starting a booking for one or several rooms." },
  { file: "05-payment", title: "Payment interface", caption: "Paying securely with Paystack." },
  { file: "06-receptionist", title: "Receptionist dashboard", caption: "Front-desk view of rooms and bookings." },
  { file: "07-manager", title: "Manager dashboard", caption: "Operational overview for managers." },
  { file: "08-ceo", title: "CEO dashboard", caption: "Revenue and operations at a glance." },
  { file: "09-attendance", title: "Staff attendance", caption: "Clock-in, clock-out and working hours." },
  { file: "10-analytics", title: "Analytics and revenue", caption: "Revenue and operational information." },
  { file: "11-mobile", title: "Mobile interface", caption: "The experience on a phone." },
  { file: "12-desktop", title: "Desktop interface", caption: "The experience on a desktop." },
];
