import s from "@/styles/choiceslider.module.scss";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { DIFFICULTY } from "@/hooks/use-settings";

const ChoiceSlider = ({
  choices,
  onChange,
  preSelected,
}: {
  choices: { value: DIFFICULTY; display: string }[];
  onChange: (diff: DIFFICULTY) => void;
  preSelected: DIFFICULTY;
}) => {
  const BORDER_SIZE = 5;
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<DIFFICULTY>(preSelected);
  const [sliderStyle, setSliderStyle] = useState<any>({});
  const choiceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const allChosen = selected === DIFFICULTY.MIXED;

  const allChosenStyle = {
    transform: `translateX(0px)`,
    width: `100%`,
  };

  useEffect(() => {
    console.log({ preSelected });
    if (preSelected === DIFFICULTY.MIXED) {
      setSelected(DIFFICULTY.MIXED);
    } else if (choiceRefs.current.length === choices.length) {
      const found = choiceRefs.current.find(
        (x) => x?.getAttribute("data-difficulty") === preSelected,
      );
      found?.click();
    }
  }, [preSelected, choiceRefs]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const onClick = (e: SyntheticEvent<HTMLDivElement>) => {
    if (boxRef.current) {
      const { left: choiceLeft, width: choiceWidth } =
        e.currentTarget.getBoundingClientRect();
      const { left: boxLeft } = boxRef.current?.getBoundingClientRect();
      const difficulty = e.currentTarget.getAttribute("data-difficulty");
      console.log(difficulty);
      if (difficulty) {
        setSelected(difficulty as DIFFICULTY);
      }

      setSliderStyle({
        transform: `translateX(${choiceLeft - boxLeft}px)`,
        width: `${choiceWidth}px`,
      });
    }
  };

  useEffect(() => {
    onChange(selected as DIFFICULTY);
  }, [selected]);

  const onToggleMixed = () => {
    if (selected === DIFFICULTY.MIXED) {
      setSelected(DIFFICULTY.EASY);
    } else {
      setSelected(DIFFICULTY.MIXED);
    }
  };

  return (
    <div
      className={s.choiceSlider}
      style={{ border: `${BORDER_SIZE}px solid white` }}
    >
      <div className={s.choiceInner} ref={boxRef}>
        <div
          className={s.slider}
          style={allChosen ? allChosenStyle : sliderStyle}
        >
          <div className={s.innerSlider}></div>
        </div>
        <div className={s.choiceWrapper}>
          {choices.map((c, i) => {
            return (
              <div
                ref={(r) => (choiceRefs.current[i] = r)}
                className={s.choice}
                data-difficulty={c.value}
                onClick={onClick}
              >
                <span>{c.display}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={classNames(
          s.chooseAll,
          selected === DIFFICULTY.MIXED ? s.clicked : null,
        )}
        onClick={onToggleMixed}
      >
        <span>BLANDAT</span>
      </div>
    </div>
  );
};
export default ChoiceSlider;
