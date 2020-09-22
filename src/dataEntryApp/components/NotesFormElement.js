import React from "react";
import { TextField } from "@material-ui/core";
import { isEmpty, find } from "lodash";
import { useTranslation } from "react-i18next";

export default ({ formElement: fe, value, update, validationResults, uuid }) => {
  const { t } = useTranslation();
  const validationResult = find(
    validationResults,
    validationResult => validationResult.formIdentifier === uuid
  );

  return (
    <TextField
      label={t(fe.display || fe.name)}
      type={"text"}
      required={fe.mandatory}
      name={fe.name}
      value={value}
      multiline
      fullWidth
      variant="outlined"
      helperText={validationResult && t(validationResult.messageKey, validationResult.extra)}
      error={validationResult && !validationResult.success}
      onChange={e => {
        const v = e.target.value;
        isEmpty(v) ? update() : update(v);
      }}
      disabled={!fe.editable}
    />
  );
};
