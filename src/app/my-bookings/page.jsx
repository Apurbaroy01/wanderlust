
import Image from "next/image";
import { Eye, Trash2, CalendarDays, MapPin, CheckCircle2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const bookings = [
    {
        id: "b1",
        title: "Bali Paradise",
        status: "Confirmed",
        price: 1299,
        date: "May 15, 2026",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "b2",
        title: "Bali Paradise",
        status: "Confirmed",
        price: 1299,
        date: "May 15, 2026",
        image:
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "b3",
        title: "Venice & Italian Riviera",
        status: "Pending",
        price: 1299,
        date: "May 15, 2026",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    },
];

export default async function MyBookingsPage() {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    console.log("Session in My Bookings Page:", session);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-black">My Bookings</h1>

                <p className="text-gray-500 mt-2">
                    Manage and view your upcoming travel plans
                </p>
            </div>

            {/* Booking Cards */}
            <div className="space-y-5">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="border border-gray-200 bg-white p-4 flex flex-col lg:flex-row gap-5 justify-between items-center"
                    >
                        {/* Left */}
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            {/* Image */}
                            <div className="relative w-full md:w-[280px] h-[170px] overflow-hidden">
                                <Image
                                    src={booking.image}
                                    alt={booking.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center">
                                {/* Status */}
                                <div
                                    className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full w-fit mb-3 ${booking.status === "Confirmed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-orange-100 text-orange-700"
                                        }`}
                                >
                                    <CheckCircle2 size={14} />
                                    {booking.status}
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl font-bold text-black mb-3">
                                    {booking.title}
                                </h2>

                                {/* Info */}
                                <div className="space-y-2 text-gray-500 text-sm">
                                    <p className="flex items-center gap-2">
                                        <CalendarDays size={15} />
                                        Departure: {booking.date}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <MapPin size={15} />
                                        Booking ID: {booking.id}
                                    </p>
                                </div>

                                {/* Price */}
                                <h3 className="text-4xl font-bold text-cyan-500 mt-4">
                                    ${booking.price}
                                </h3>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <button className="border border-red-300 text-red-500 px-5 py-2 flex items-center gap-2 hover:bg-red-50 transition">
                                <Trash2 size={16} />
                                Cancel
                            </button>

                            <button className="bg-cyan-500 text-white px-5 py-2 flex items-center gap-2 hover:bg-cyan-600 transition">
                                <Eye size={16} />
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}