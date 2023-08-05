import "../style/style.scss";
import { CardType } from "../types";
import { CARDS_QUERY } from "../graphql";
import { useQuery } from "@apollo/client";
import SingleCard from "./SingleCard";
import AddCardDialog from "./AddCardDialog";

type props = {
  name: string | null;
  id: string | null;
};

const Cards = ({ id }: props) => {
  const { data, loading, error } = useQuery(CARDS_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("CARDS_QUERY error", error);
    return <>{error.message}</>;
  } else {
    return (
      <div className="container">
        {data.cards?.map((cd: CardType) => {
          return (
            <SingleCard
              key={cd.id}
              question={cd.question}
              answer={cd.answer}
              id={cd.id}
              createdAt={cd.createdAt}
              lastReading={cd.lastReading}
              history={[]}
              set={id}
            ></SingleCard>
          );
        })}
        <AddCardDialog setId={id ?? ""}></AddCardDialog>
      </div>
    );
  }
};

export default Cards;
