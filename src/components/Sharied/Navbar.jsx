"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log("Session data:", session);

  return (
    <nav className="flex justify-between bg-white p-5">
      <ul className="flex gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>

        <li>
          <Link href={"/add-destination"}>Add Destination</Link>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          height={150}
          width={150}
          alt="logo"
        />
      </div>

      <ul className="flex gap-3">
        
        {isPending ? <p>Loading...</p> : session ? <div className="flex gap-3">
          <li> <Link href={"/profile"}>Profile</Link></li>
          <li><button className="btn " onClick={() => authClient.signOut()}>Logout</button></li>
        </div> :
          <div className="flex gap-3">
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/register"}>Sign Up</Link>
            </li>
          </div>}
      </ul>
    </nav>
  );
};

export default Navbar;
