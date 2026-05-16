"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

  const {
    data: session,
    isPending,
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

      <div className="flex items-center gap-4">
        {isPending ? (
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm"></span>
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        ) : session?.user ? (
          <div className="flex items-center gap-3">
            {/* Profile Button */}
            <Link
              href="/profile"
              className="hidden md:flex items-center gap-2  px-4 py-2 text-sm font-medium"
            >
              <Avatar className="h-8 w-8">
                <Avatar.Image
                  alt={session.user?.name}
                  src={session.user?.image}
                />

                <Avatar.Fallback>
                  {session.user?.name?.charAt(0)?.toUpperCase()}
                </Avatar.Fallback>
              </Avatar>

              <span>
                {session.user?.name?.split(" ")[0] || "Profile"}
              </span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={async () => {
                try {
                  await authClient.signOut();
                } catch (error) {
                  console.error("Logout error:", error);
                }
              }}
              className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-cyan-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-500"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-white shadow transition hover:scale-105 hover:bg-cyan-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
