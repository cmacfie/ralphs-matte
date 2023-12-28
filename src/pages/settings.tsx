import s from "@/styles/settings.module.scss";
import RootLayout from "@/app/layout";
import React, { useEffect, useState } from "react";
import useSettings, { DIFFICULTY, ISettings } from "@/hooks/use-settings";
import Input from "@/components/input";
import NormalButton from "@/components/NormalButton";
import layout from "@/styles/layout.module.scss";
import { useRouter } from "next/router";
import Icon, { Icons } from "@/components/Icon";
import Head from "next/head";
import ChoiceSlider from "@/components/ChoiceSlider";

const SettingsPage = () => {
  const { getSettings, updateSettings } = useSettings();
  const router = useRouter();
  const [settings, setSettings] = useState<ISettings>(getSettings());

  const changeSettings = (
    value: string,
    area: "additionRange" | "multiplicationRange",
    field: "min" | "max",
  ) => {
    setSettings({
      ...settings,
      [area]: {
        ...settings[area],
        [field]: parseInt(value),
      },
    });
  };

  const setDifficulty = (difficulty: DIFFICULTY) => {
    setSettings((old) => ({
      ...old,
      difficulty,
    }));
  };

  const onSave = () => {
    updateSettings(settings);
    router.push("/");
  };

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  return (
    <>
      <Head>
        <title>Ralphs - Inställningar</title>
      </Head>
      <RootLayout>
        <div className={s.settingsPage}>
          <div className={s.inputs}>
            <div className={s.inputColumn}>
              <h2 className={s.header}>MATTETAL PER ARK</h2>

              <div className={s.inputRow}>
                <div className={s.inputAndLabelWrapper}>
                  <label>Antal</label>
                  <div className={s.inputWrapper}>
                    <Input
                      value={settings.numberOfProblems}
                      type={"number"}
                      onChange={(e) => {
                        setSettings((old) => ({
                          ...old,
                          numberOfProblems: parseInt(e.target.value),
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChoiceSlider
                onChange={setDifficulty}
                preSelected={settings.difficulty}
                choices={[
                  { display: "LÄTT", value: DIFFICULTY.EASY },
                  { display: "MEDEL", value: DIFFICULTY.MEDIUM },
                  { display: "SVÅRT", value: DIFFICULTY.HARD },
                  { display: "JÄTTESVÅRT", value: DIFFICULTY.VERY_HARD },
                ]}
              />
            </div>

            <div className={s.inputColumn}>
              <h2 className={s.header}>Multiplikation / Division</h2>
              <div className={s.inputRow}>
                <div className={s.inputAndLabelWrapper}>
                  <label>Minst</label>
                  <Input
                    value={settings.multiplicationRange.min}
                    type={"number"}
                    onChange={(e) =>
                      changeSettings(
                        e.target.value,
                        "multiplicationRange",
                        "min",
                      )
                    }
                  />
                </div>
                <div className={s.inputAndLabelWrapper}>
                  <label>Max</label>
                  <Input
                    value={settings.multiplicationRange.max}
                    type={"number"}
                    onChange={(e) =>
                      changeSettings(
                        e.target.value,
                        "multiplicationRange",
                        "max",
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <NormalButton
            className={layout.grow}
            color={"primary"}
            onClick={onSave}
          >
            <Icon icon={Icons.SAVE} />
            <span>SPARA</span>
          </NormalButton>
        </div>
      </RootLayout>
    </>
  );
};
export default SettingsPage;
