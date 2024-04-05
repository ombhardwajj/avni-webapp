import React from "react";
import { RepeatableQuestionGroup } from "openchs-models";
import QuestionGroupFormElement from "./QuestionGroupFormElement";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { LineBreak } from "../../common/components/utils";

function AddMoreButton({ addNewQuestionGroup, formElement }) {
  return (
    <Button
      onClick={() => addNewQuestionGroup(formElement.concept)}
      color="primary"
    >{`Add One More - ${formElement.concept.name}`}</Button>
  );
}

function RemoveButton({ removeQuestionGroup, formElement, index }) {
  return (
    <Button onClick={() => removeQuestionGroup(formElement.concept, index)} color="primary">
      {"Remove"}
    </Button>
  );
}

export function RepeatableQuestionGroupElement({
  formElement,
  obsHolder,
  validationResults,
  filteredFormElements,
  updateObs,
  addNewQuestionGroup,
  removeQuestionGroup
}) {
  let repeatableQuestionGroup = obsHolder.findObservation(formElement.concept);
  const hasNoObservation = _.isNil(repeatableQuestionGroup);
  if (hasNoObservation) repeatableQuestionGroup = new RepeatableQuestionGroup();
  const repeatableQuestionGroupValue = repeatableQuestionGroup.getValue();
  const hasMultipleElements = repeatableQuestionGroupValue.length > 1;
  return repeatableQuestionGroupValue.map((x, index) => {
    const isLastElement = !hasNoObservation && repeatableQuestionGroupValue.length === index + 1;
    return (
      <>
        <QuestionGroupFormElement
          formElement={formElement}
          filteredFormElements={filteredFormElements}
          obsHolder={obsHolder}
          updateObs={updateObs}
          validationResults={validationResults}
          isRepeatable={true}
          questionGroupIndex={index}
          key={index}
        />
        {(hasMultipleElements || isLastElement) && <LineBreak num={1} />}
        <>
          {hasMultipleElements && (
            <RemoveButton
              formElement={formElement}
              index={index}
              removeQuestionGroup={removeQuestionGroup}
            />
          )}
          {isLastElement && (
            <AddMoreButton formElement={formElement} addNewQuestionGroup={addNewQuestionGroup} />
          )}
        </>
        {!isLastElement && <LineBreak num={2} />}
      </>
    );
  });
}
