import { motion } from 'framer-motion';
import React, { FC, useRef, useState } from 'react';

import { findCommonDebt } from '@queries/useAddDebtMutation';

import { Debt } from '@interfaces/debt';
import { Person } from '@interfaces/person';

import useMousePosition from '@hooks/useMousePosition';

const x0 = 400;
const y0 = 400;
const r = 200;

interface Point {
  x: number;
  y: number;
  person: Person;
}

function getPointOnLineByDistance(startX: number, startY: number, endX: number, endY: number, distance: number) {
  const dx = endX - startX;
  const dy = endY - startY;
  const lineLength = Math.sqrt(dx * dx + dy * dy);
  const unitDx = dx / lineLength;
  const unitDy = dy / lineLength;
  const pointX = startX + unitDx * distance;
  const pointY = startY + unitDy * distance;
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
  selectedPerson: Person | null;
}

export const DebtGraph: FC<Props> = ({ people, debts, onPersonClick, selectedPerson }) => {
  const [highlightedPerson, setHighlightedPerson] = useState<Person | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { xCord, yCord } = useMousePosition({ divRef });

  const peoplePoints = getPeoplePoints(people);
  const selectedPersonPoint = peoplePoints.find((e) => e.person === selectedPerson);
  const highlightedDebts = debts.filter((debt) => debt.of === highlightedPerson?.name);

  const isPersonColored = (person: Person) => {
    return (
      !!selectedPerson ||
      !highlightedPerson ||
      highlightedDebts.some((debt) => debt.to === person.name || debt.of === person.name) ||
      highlightedPerson === person
    );
  };

  const isDebtColored = (debt: Debt) => {
    return !!selectedPerson || !highlightedPerson || highlightedDebts.includes(debt);
  };

  return (
    <div ref={divRef}>
      <svg ref={svgRef} width="800" height="800" className="absolute top-0 left-0">
        {debts.map((debt, i) => {
          const ofPoint = peoplePoints.find((e) => e.person.name === debt.of);
          const toPoint = peoplePoints.find((e) => e.person.name === debt.to);
          if (!ofPoint || !toPoint) {
            return;
          }
          const selectionCommonDebt =
            !!highlightedPerson &&
            !!selectedPerson &&
            findCommonDebt(debts, highlightedPerson.name, selectedPerson.name);
          const isSelectionANegativeOwe =
            !!highlightedPerson && selectionCommonDebt === debt && selectionCommonDebt.of === highlightedPerson.name;
          return (
            <g key={'line' + i}>
              <motion.line
                x1={ofPoint.x}
                y1={ofPoint.y}
                x2={toPoint.x}
                y2={toPoint.y}
                stroke="black"
                animate={{
                  strokeWidth: isSelectionANegativeOwe ? 30 : 0,
                  stroke: 'black',
                }}
              />
              <motion.line
                x1={ofPoint.x}
                y1={ofPoint.y}
                x2={toPoint.x}
                y2={toPoint.y}
                animate={{
                  stroke: toPoint.person.color,
                  strokeWidth: isSelectionANegativeOwe ? 28 : 0,
                }}
              />
              <motion.line
                x1={ofPoint.x}
                y1={ofPoint.y}
                x2={toPoint.x}
                y2={toPoint.y}
                stroke="black"
                animate={{
                  strokeWidth: debt.of === selectedPerson?.name && debt.to === highlightedPerson?.name ? 25 : 17,
                  stroke: 'black',
                }}
              />
              <motion.line
                x1={ofPoint.x}
                y1={ofPoint.y}
                x2={toPoint.x}
                y2={toPoint.y}
                animate={{
                  stroke: isDebtColored(debt) ? ofPoint.person.color : '#d4d4d4',
                  strokeWidth: debt.of === selectedPerson?.name && debt.to === highlightedPerson?.name ? 23 : 15,
                }}
              />
            </g>
          );
        })}

        {selectedPersonPoint &&
          !!selectedPerson &&
          (!highlightedPerson || !findCommonDebt(debts, selectedPerson?.name, highlightedPerson?.name)) && (
            <>
              <motion.line
                x1={selectedPersonPoint.x}
                y1={selectedPersonPoint.y}
                x2={xCord}
                y2={yCord}
                stroke="black"
                strokeWidth={17}
                strokeLinecap="round"
              />
              <line
                x1={selectedPersonPoint.x}
                y1={selectedPersonPoint.y}
                x2={xCord}
                y2={yCord}
                stroke={selectedPersonPoint.person.color}
                strokeWidth={15}
                strokeLinecap="round"
              />
            </>
          )}

        {peoplePoints.map((point, i) => (
          <g
            key={'avatar' + i}
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
                point.person === selectedPerson
                  ? { scale: 1.3, fill: point.person.color }
                  : point.person === highlightedPerson && !!selectedPerson
                  ? { scale: 1.3, fill: point.person.color }
                  : isPersonColored(point.person)
                  ? { scale: 1.1, fill: point.person.color }
                  : { scale: 1, fill: '#d4d4d4' }
              }
              transition={{ duration: 0.3 }}
              stroke="black"
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
          const { x, y } = getPointOnLineByDistance(ofPoint.x, ofPoint.y, toPoint.x, toPoint.y, 100);
          return (
            <g key={'debt' + i}>
              <motion.circle
                cx={x}
                cy={y}
                r={debt.amount / 500 + 13}
                animate={
                  isDebtColored(debt) ? { scale: 1.1, fill: ofPoint.person.color } : { scale: 1, fill: '#d4d4d4' }
                }
                transition={{ duration: 0.3 }}
                stroke="black"
              />
              <motion.text
                x={x}
                y={y}
                alignmentBaseline="middle"
                textAnchor="middle"
                animate={isDebtColored(debt) ? { fill: 'white' } : { fill: 'darkgray' }}
              >
                {debt.amount}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
