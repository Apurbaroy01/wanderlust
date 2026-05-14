import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;

    let destination = null;

    try {
        const res = await fetch(
            `http://localhost:5000/destinations/${id}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch destination");
        }

        destination = await res.json();
    } catch (error) {
        console.log(error);
    }

    if (!destination) {
        return (
            <div className="text-center mt-10">
                Destination not found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 justify-end mt-5 mb-3">
                <EditModal destination={destination} />
                <DeleteAlert destination={destination} />
            </div>

            {destination.imageUrl && (
                <Image
                    className="w-full h-100 object-cover"
                    alt={destination.destinationName}
                    src={destination.imageUrl.trim()}
                    height={500}
                    width={800}
                />
            )}

            <div className="p-2">
                <div className="flex items-center gap-1">
                    <LuMapPin />
                    <span>{destination.country}</span>
                </div>

                <div className="flex justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            {destination.destinationName}
                        </h2>

                        <div className="flex gap-1 items-center">
                            <FaRegCalendar />
                            {destination.duration} Days
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold">
                            $ {destination.price}
                        </h3>
                    </div>
                </div>

                <h1 className="mt-10 text-2xl font-bold">
                    Overview
                </h1>

                <p>{destination.description}</p>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;