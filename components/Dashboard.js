import { getStreams } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [streams, setStreams] = useState([]);
  const [streamer, setStreamer] = useState("");

  const handleClick = async () => {
    const response = await getStreams(streamer);
    if (response.data.data.length === 0) {
      setStreams([]);
    } else {
      setStreams([...streams, ...response.data.data]);
    }
  };

  return (
    <div className="bg-purple-600 w-1/2 h-[80vh] p-5 m-5 text-4xl rounded-2xl overflow-auto">
      <div className="flex flex-col justify-between">
        <h1 className="text-white">Dashboard</h1>
        <input
          className="m-2 rounded-lg p-2"
          value={streamer}
          onChange={(e) => setStreamer(e.target.value)}
        />
        <button className="bg-purple-300 rounded-2xl p-2" onClick={handleClick}>
          Add
        </button>
      </div>
      <div className="flex flex-col my-4">
        {streams.length === 0 && (
          <p className="text-white">Sem canais adicionados...</p>
        )}
        {streams &&
          streams.map(function (stream) {
            let thumbnail = stream.thumbnail_url.replace(
              "{width}x{height}",
              "640x360"
            );
            return (
              <div
                key={stream.id}
                className="flex flex-col border-purple-300 border-4 p-2 rounded-2xl my-3 place-items-center w-full"
              >
                <a
                  href={`https://twitch.tv/${stream.user_name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={thumbnail}
                    width={640}
                    height={360}
                    alt={stream.user_name}
                    className="rounded-2xl my-2 w-full"
                  />
                </a>
                <div className="flex flex-col justify-between w-full p-4">
                  <p className="text-white text-sm">
                    <b>Título:</b> {stream.title}
                  </p>
                  <h3 className="text-white text-sm">
                    <b>Streamer:</b> {stream.user_name}
                  </h3>
                  <p className="text-white text-sm">
                    <b>Viewers:</b> {stream.viewer_count}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// export function getServerSideProps() {
//   const streamsServer = getStreams();
//   console.log(streamsServer);
//   return {
//     props: {
//       streamsServer,
//     },
//   };
// }
