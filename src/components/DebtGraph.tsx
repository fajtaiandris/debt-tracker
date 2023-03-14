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

function getPointOnLine(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  percent: number
) {
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const normalizedDx = dx / length;
  const normalizedDy = dy / length;
  const distanceAlongLine = length * percent;
  const pointX = startX + normalizedDx * distanceAlongLine;
  const pointY = startY + normalizedDy * distanceAlongLine;
  return { x: pointX, y: pointY };
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
        {debts.map((debt, i) => {
          const ofPoint = peoplePoints.find((e) => e.person.name === debt.of);
          const toPoint = peoplePoints.find((e) => e.person.name === debt.to);
          if (!ofPoint || !toPoint) {
            return;
          }
          return (
            <motion.line
              key={"line" + i}
              x1={ofPoint.x}
              y1={ofPoint.y}
              x2={toPoint.x}
              y2={toPoint.y}
              animate={
                isDebtColored(debt)
                  ? { stroke: ofPoint.person.color }
                  : { stroke: "#d4d4d4" }
              }
              strokeWidth={debt.amount / 1000 + 5}
            />
          );
        })}

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
        {debts.map((debt, i) => {
          const ofPoint = peoplePoints.find((e) => e.person.name === debt.of);
          const toPoint = peoplePoints.find((e) => e.person.name === debt.to);
          if (!ofPoint || !toPoint) {
            return;
          }
          const { x, y } = getPointOnLine(
            ofPoint.x,
            ofPoint.y,
            toPoint.x,
            toPoint.y,
            0.5
          );
          return (
            <>
              <motion.circle
                cx={x}
                cy={y}
                r={debt.amount / 500 + 13}
                animate={
                  isDebtColored(debt)
                    ? { scale: 1.1, fill: ofPoint.person.color }
                    : { scale: 1, fill: "#d4d4d4" }
                }
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              />
              <motion.text
                x={x}
                y={y}
                alignmentBaseline="middle"
                textAnchor="middle"
                animate={
                  isDebtColored(debt) ? { fill: "white" } : { fill: "darkgray" }
                }
              >
                {debt.amount}
              </motion.text>
            </>
          );
        })}
      </svg>
    </>
  );
};
