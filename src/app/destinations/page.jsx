import DestinationCard from "@/components/DestinationCard/DestinationCard";

const destinationPage = async () => {
    const res = await fetch("http://localhost:5000/destinations");
    const destinations = await res.json();
    console.log("Destinations Data:", destinations);
    return (
        <div className="max-w-7xl mx-auto">
            <h1>All destinations</h1>


            <div className="grid grid-cols-4 gap-5">
                {
                    destinations.map(destination => <DestinationCard key={destination._id} destination={destination} />)
                }

            </div>

        </div>
    );
};

export default destinationPage;