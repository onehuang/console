// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { IWizardButton, IWizardPage } from "./types";
import { Button, LinearProgress } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    wizardStepContainer: {
      display: "flex",
      flexDirection: "column",
    },
    wizardComponent: {
      overflowY: "auto",
      marginBottom: 10,
      height: "calc(100vh - 342px)",
      maxWidth: 840,
      width: "100%",
    },
    wizardModal: {
      overflowY: "auto",
      marginBottom: 10,
      height: "calc(100vh - 515px)",
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start" as const,
      padding: "10px 0",
      borderTop: "#EAEAEA 1px solid",
      "& button": {
        marginLeft: 10,
      },
      "&.forModal": {
        paddingBottom: 0,
      },
    },
    buttonInnerContainer: {
      maxWidth: 840,
      width: "100%",
      textAlign: "right" as const,
    },
  });

const WizardPage = ({
  classes,
  page,
  pageChange,
  loadingStep,
  forModal,
}: IWizardPage) => {
  const buttonAction = (btn: IWizardButton) => {
    switch (btn.type) {
      case "next":
        pageChange("++");
        break;
      case "back":
        pageChange("--");
        break;
      case "to":
        pageChange(btn.toPage || 0);
        break;
      case "custom":
      default:
    }

    if (btn.action) {
      btn.action(pageChange);
    }
  };

  return (
    <div className={classes.wizardStepContainer}>
      <div className={forModal ? classes.wizardModal : classes.wizardComponent}>
        {page.componentRender}
      </div>
      {loadingStep && (
        <div>
          <LinearProgress />
        </div>
      )}
      <div
        className={`${classes.buttonsContainer} ${forModal ? "forModal" : ""}`}
      >
        <div className={classes.buttonInnerContainer}>
          {page.buttons.map((btn) => {
            return (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  buttonAction(btn);
                }}
                disabled={!btn.enabled}
                key={`button-${page.label}-${btn.label}`}
              >
                {btn.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(WizardPage);
