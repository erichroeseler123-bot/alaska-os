"use client";

interface Props {
  pk: number;
  shortname?: string;
}

export default function BookButton({ pk, shortname = "juneauadventuretours" }: Props) {
  return (
    <button
      onClick={() => {
        // @ts-ignore (FareHarbor adds 'FH' to the window object)
        if (typeof window.FH !== "undefined") {
            // @ts-ignore
            window.FH.open({ shortname: shortname, view: "item", item: pk });
        } else {
            console.warn("FareHarbor Widget not loaded yet.");
            // Fallback link if script fails
            window.location.href = `https://fareharbor.com/embeds/book/${shortname}/items/${pk}/`;
        }
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
    >
      Check Availability
    </button>
  );
}
