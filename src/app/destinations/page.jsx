import DestinationCard from "@/components/DestinationCard/DestinationCard";

const DestinationPage = async () => {

    let destinations = [];

    try {

        const res = await fetch(
            "http://localhost:5000/destinations",
            {
                cache: "no-store"
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch destinations");
        }

        destinations = await res.json();

        console.log("Destinations Data:", destinations);

    } catch (error) {

        console.log(error.message);

    }

    return (
        <div className="max-w-7xl mx-auto">

            <h1 className="text-3xl font-bold mb-10">
                All Destinations
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                {
                    destinations.map(destination => (
                        <DestinationCard
                            key={destination._id}
                            destination={destination}
                        />
                    ))
                }

            </div>

        </div>
    );
};

export default DestinationPage;