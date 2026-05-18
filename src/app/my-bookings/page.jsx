""
import Image from "next/image";
import { Eye, Trash2, CalendarDays, MapPin, CheckCircle2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeleteModal from "@/components/DeleteModal";


export default async function MyBookingsPage() {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (!session?.user) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-black">
                    Please log in to view your bookings
                </h1>
            </div>
        );
    }

    const res = await fetch(`http://localhost:5000/bookings/${session?.user.id}`, {
        cache: "no-store",
    });
    const booking = await res.json();

    console.log("Session in My Bookings Page:", booking);


    const handleDelete = (id) => {
        console.log("Delete:", id);
    };



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
                {booking.map((booking) => (
                    <div
                        key={booking._id}
                        className="border border-gray-200 bg-white p-4 flex flex-col lg:flex-row gap-5 justify-between items-center"
                    >
                        {/* Left */}
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            {/* Image */}
                            <div className="relative w-full md:w-[280px] h-[170px] overflow-hidden">
                                <Image
                                    src={booking?.photo}
                                    alt={"Booking Image"}
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
                                    {booking?.title}
                                </h2>

                                {/* Info */}
                                <div className="space-y-2 text-gray-500 text-sm">
                                    <p className="flex items-center gap-2">
                                        <CalendarDays size={15} />
                                        Departure: {booking.date}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <MapPin size={15} />
                                        Booking ID: {booking._id}
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
                            <DeleteModal details={booking} />

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