import { Card, styled } from "@mui/material";
import { FC, ReactNode } from "react";

export const StyledCard = styled(Card)`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem;
  min-width: 20rem;
  max-width: 25rem;
  flex: 1;
`;

const InfoCard: FC<InfoCardData> = ({
  cardTitle,
  cardContent,
  customChildren,
}: InfoCardData) => {
  return (
    <StyledCard>
      <div className="flex gap-2">
        <h3 className="text-2xl font-bold">{cardTitle}</h3>
        {customChildren}
      </div>
      <div className="text-lg">
        {cardContent.map(({ title, content }, index) => (
          <div className="flex justify-between gap-3" key={index}>
            {title}: <span className="font-bold">{content}</span>
          </div>
        ))}
      </div>
    </StyledCard>
  );
};

export interface InfoCardData {
  cardTitle: string;
  cardContent: {
    title: string;
    content: string;
  }[];
  customChildren?: ReactNode;
}

export default InfoCard;
