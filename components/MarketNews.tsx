"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MarketNews({ country}: {country: string }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = () =>
      fetch(`/api/market-news?country=${country}`)
        .then((res) => res.json())
        .then(setNews);

    fetchNews();
    const interval = setInterval(fetchNews, 7200000);
    return () => clearInterval(interval);
  }, [country]);

  return (
    <div className="space-y-3 p-4 bg-zinc-900 text-white rounded-xl h-[600px] overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-bold">Market News</h2>
      {news.slice(0, 8).map((n: any, i: number) => (
        <a
          key={i}
          href={n.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-b border-zinc-700 pb-2"
        >
          {n.image_url && (
            <img
              src={n.image_url}
              alt="News image"
              className="w-[500px] h-[180px] rounded-md object-contain mb-2"
            />
          )}

          <div className="font-semibold">{n.title}</div>
          <div className="text-[12px] flex flex-row justify-between">
            <div className="font-semibold text-red-500">{n.source_name}</div>
            <div className="text-zinc-400">
              {n.pubDate
                ? (() => {
                    const date = new Date(n.pubDate + " UTC");
                    const day = date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });
                    const time = date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }); 
                    return `${day}\n${time} (${n.pubDateTZ || "UTC"})`;
                  })()
                : "No Date"}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}