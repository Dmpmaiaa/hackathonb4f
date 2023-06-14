import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment/moment";

export default function GameCard({
    eventId,
    numPlayer,
    schedule,
    participants,
    date,
    signToEvent,
    beachId,
    unsubscribe,
}) {
    const [beachInfo, setBeachInfo] = useState([]);

    const findCorrectBeach = (id) => {
        return beachInfo.find((ele) => ele._id == id);
    };

    const fetchData = async () => {
        const beachRes = await fetch("/api/beaches");
        const beachData = await beachRes.json();
        setBeachInfo(await beachData);
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    return (
        <div className="text-dark-blue flex items-center justify-around rounded-[10px] w-[347px] h-[99px]  bg-primary-orange mb-4">
            {findCorrectBeach(beachId) && (
                <div className="flex flex-col justify-center h-[100px] w-[100px]">
                    <Image
                        priority
                        src={findCorrectBeach(beachId)?.img}
                        width={100}
                        height={100}
                        alt="Fotografia do campo"
                        className="rounded-[10px]"
                    />
                </div>
            )}

            <div className="flex flex-col text-contrastOffWhite w-1/3 ">
                <p className="text-sm pb-1 font-robotoBold">
                    {findCorrectBeach(beachId)?.name}
                </p>

                <p className="text-xs font-robotoRegular">
                    {findCorrectBeach(beachId)?.location}
                </p>
                <div className="flex gap-2 text-xs">
                    <span className="font-robotoRegular">
                        {moment(date).format("DD-MM-YYYY")}
                    </span>
                    <span className="font-robotoRegular ">{schedule}</span>
                </div>
            </div>

            <div>
                <div className="flex flex-col w-[60px] gap-2">
                    {!participants?.some(
                        (el) => el !== "6479ec3f1de2044d9892asaba"
                    ) ? (
                        <div
                            className={`flex flex-col w-[60px] bg-contrast-green text-primaryDarkestBlue"
                            } w-14 rounded justify-center text-sm`}
                            onClick={() =>
                                signToEvent("6479ec3f1de2044d9892aaba", eventId)
                            }
                        >
                            <span className="text-center text-xs p-1 font-robotoRegular">
                                Juntar-se
                            </span>
                        </div>
                    ) : (
                        <div
                            className={`flex flex-col w-[60px] bg-secondaryRed rounded justify-center text-sm`}
                            onClick={() =>
                                unsubscribe("6479ec3f1de2044d9892aaba", eventId)
                            }
                        >
                            <span className="text-center text-xs p-1 font-robotoRegular">
                                Sair
                            </span>
                        </div>
                    )}
                    <div>
                        {participants?.some(
                            (el) => el !== "6479ec3f1de2044d9892asaba"
                        ) && (
                            <div className="bg-green-500  w-[60px] font-riftItalic text-center text-xs ">
                                <span>Inscrito</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

{
    /* <div className="flex flex-col mr-3 space-y-1  ">
<button className=" bg-primaryBlue text-contrastOffWhite rounded-lg w-[80px] h-[28px] p">
0/10 +
{/** NUMERO DE JOGADORES INSCRITOS. MUDAR A COR CONSOANTE N DE INSCRITOS
</button>

</div> */
}