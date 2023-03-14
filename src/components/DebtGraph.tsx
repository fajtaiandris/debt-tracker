import { motion } from "framer-motion";
import { FC, useState } from "react";
import { Debt } from "../interfaces/debt";
import { Person } from "../interfaces/person";

const x0 = 400;
const y0 = 400;
const r = 200;

interface Point {
  x: number;
  y: number;
  person: Person;
}

function getPeoplePoints(people: Person[]): Point[] {
  const n = people.length;
  const theta = (Math.PI * 2) / n;
  return people.map((person, index) => {
    return {
      x: x0 + r * Math.cos(theta * index),
      y: y0 + r * Math.sin(theta * index),
      person: person,
    };
  });
}

interface Props {
  people: Person[];
  debts: Debt[];
  onPersonClick: (person: Person) => void;
}

export const DebtGraph: FC<Props> = ({ people, debts, onPersonClick }) => {
  const [highlightedPerson, setHighlightedPerson] = useState<Person | null>(
    null
  );

  const peoplePoints = getPeoplePoints(people);
  const highlightedDebts = debts.filter(
    (debt) => debt.of === highlightedPerson?.name
  );

  const isPersonColored = (person: Person) => {
    return (
      !highlightedPerson ||
      highlightedDebts.some(
        (debt) => debt.to === person.name || debt.of === person.name
      ) ||
      highlightedPerson === person
    );
  };

  const isDebtColored = (debt: Debt) => {
    return !highlightedPerson || highlightedDebts.includes(debt);
  };

  return (
    <>
      <svg width="800" height="800">
        {debts.map((debt, i) => (
          <line
            key={"line" + i}
            x1={peoplePoints.find((e) => e.person.name === debt.of)?.x}
            y1={peoplePoints.find((e) => e.person.name === debt.of)?.y}
            x2={peoplePoints.find((e) => e.person.name === debt.to)?.x}
            y2={peoplePoints.find((e) => e.person.name === debt.to)?.y}
            stroke={
              isDebtColored(debt)
                ? peoplePoints.find((e) => e.person.name === debt.of)?.person
                    .color
                : "#d4d4d4"
            }
            strokeWidth={debt.amount / 1000 + 5}
          />
        ))}

        {peoplePoints.map((point, i) => (
          <g
            key={"avatar" + i}
            onMouseEnter={() => {
              setHighlightedPerson(point.person);
            }}
            onMouseLeave={() => {
              setHighlightedPerson(null);
            }}
            onClick={() => {
              onPersonClick(point.person);
            }}
            className="hover:cursor-pointer"
          >
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="60"
              animate={
                isPersonColored(point.person)
                  ? { scale: 1.1, fill: point.person.color }
                  : { scale: 1, fill: "#d4d4d4" }
              }
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            />
            <image
              href={point.person.photoUrl}
              height="100"
              width="100"
              x={point.x - 50}
              y={point.y - 50}
              stroke={point.person.color}
            />
          </g>
        ))}
      </svg>
    </>
  );
};
