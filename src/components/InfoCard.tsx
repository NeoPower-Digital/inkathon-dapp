import { FC } from "react";

const InfoCard: FC<InfoCardData> = ({
  cardTitle,
  cardContent,
  customChildren,
}: InfoCardData) => {
  return (
    <div className="flex min-w-[20em] max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
      <div className="flex gap-2">
        <h3 className="text-2xl font-bold">{cardTitle}</h3>
        {customChildren}
      </div>
      <div className="text-lg">
        {cardContent.map(({ title, content }) => (
          <div className="flex justify-between gap-3">
            {title}: <span className="font-bold">{content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface InfoCardData {
  cardTitle: string;
  cardContent: {
    title: string;
    content: string;
  }[];
  customChildren?: any;
}

export default InfoCard;
