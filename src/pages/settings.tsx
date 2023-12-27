import s from "@/styles/settings.module.scss";
import RootLayout from "@/app/layout";
import React, { useState } from "react";
import useSettings, { ISettings } from "@/hooks/use-settings";
import Input from "@/components/input";
import NormalButton from "@/components/NormalButton";
import layout from "@/styles/layout.module.scss";
import { useRouter } from "next/router";
import Icon, { Icons } from "@/components/Icon";
import Head from "next/head";

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

  const onSave = () => {
    updateSettings(settings);
    router.push("/");
  };

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
            <div className={s.inputColumn}>
              <h2 className={s.header}>Addition / Subtraktion</h2>
              <div className={s.inputRow}>
                <div className={s.inputAndLabelWrapper}>
                  <label>Minst</label>
                  <div className={s.inputWrapper}>
                    <Input
                      value={settings.additionRange.min}
                      type={"number"}
                      onChange={(e) =>
                        changeSettings(e.target.value, "additionRange", "min")
                      }
                    />
                  </div>
                </div>
                <div className={s.inputAndLabelWrapper}>
                  <label>Max</label>
                  <div className={s.inputWrapper}>
                    <Input
                      value={settings.additionRange.max}
                      type={"number"}
                      onChange={(e) =>
                        changeSettings(e.target.value, "additionRange", "max")
                      }
                    />
                  </div>
                </div>
              </div>
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
