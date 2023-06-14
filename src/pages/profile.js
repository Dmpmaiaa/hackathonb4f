import Navbar from "@/components/Navbar";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ProgressBar";
import EventCard from "@/components/EventCard";

export default function Profile(props) {
    const userId = "6479ec3f1de2044d9892aaba";
    const [userInfo, setUserInfo] = useState();
    const [events, setEvents] = useState()

    const router = useRouter();

    const fetchData = async (uid) => {
        const resUser = await fetch(`/api/users/${uid}`);
        const dataUser = await resUser.json();
        setUserInfo(dataUser);

        // const resEvents = await fetch(`/api/surf/}`);
        // const dataEvents = await res.json();
        // const userEvents = await dataEvents.playersId.some((ele) => ele._id === uid )
        // setEvents(userEvents)
    };

    useEffect(() => {
        fetchData(userId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center pt-3">
            <div className="flex flex-col w-[60%] items-center text-contrastOffWhite pt-8 mb-24  ">
                <div className=" rounded-full w-[144px] h-[144px] border-b border-r border-primaryBlue flex intems-center justify-center  text-center ">
                    <Image
                        width={150}
                        height={132}
                        src={userInfo?.img}
                        className="rounded-full"
                    />
                </div>

                <div className=" text-2xl pt-5">
                    <span className="block text-center font-robotoBold">
                        {userInfo?.name.split(" ")[0]}
                    </span>
                    <span className="font-robotoBold ">
                        {userInfo?.name.split(" ")[1]}, {userInfo?.age}{" "}
                        {userInfo?.nationality}
                    </span>
                </div>
                <div className="space-y-3 mt-10 flex w-full flex-col items-center justify-center">
                    {userInfo?.myEvents && (
                        <ProgressBar value={userInfo?.myEvents.length} />
                    )}
                </div>

                <div className="pt-10">
                    {userInfo?.myEvents &&
                        userInfo?.myEvents.map((ele) => (
                            <EventCard
                                key={ele._id}
                                eventId={ele._id}
                                beachId={ele.locationId}
                                schedule={ele.hours}
                                date={ele.date}
                            />
                        ))}
                </div>
            </div>

            <Navbar page={"profile"} />
        </div>
    );
}
