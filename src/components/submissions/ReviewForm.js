import React, { useState } from "react";
import { decamelizeKeys as toSnakeCase } from "humps";
import { isNullOrUndefined } from "util";

import { Typography } from "@material-ui/core";

import {
  FormError,
  FormSubmit,
  RatingInput,
  Input
} from "../helper/formHelpers";
import history from "../../history";
import useForm from "../../components/helper/useForm";
import { newReview } from "../../api/continuance";
import ReviewItem, { Separator } from "./ReviewItem";
import { criteria } from "./reviewCriteria";

const validate = () => {
  const errors = {};
  return errors;
};

const criteriaKeys = [
  "characters",
  "cost",
  "dialog",
  "originality",
  "socialTrend",
  "stakes",
  "structure",
  "viability"
];

const mapFormToReview = values => {
  let review = {};

  criteriaKeys.forEach(key => {
    review[key] = isNullOrUndefined(values[key])
      ? null
      : {
          score: values[key],
          comments: values[key + "Comment"] || ""
        };
  });
  review.generalComments = values.generalComments || "";

  return toSnakeCase(review);
};

const useNewReview = submissionId => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewReview = async values => {
    setLoading(true);

    const {
      data: { meta },
      status,
      statusText
    } = await newReview(submissionId, mapFormToReview(values));

    if (status === 201) {
      history.push(`/submissions/${submissionId}`);
    } else {
      setErr(meta || statusText);
    }

    setLoading(false);
  };

  const formValues = useForm(handleNewReview, validate);
  return [formValues, err, loading];
};

const ReviewForm = ({ submissionId }) => {
  const [formValues, err, loading] = useNewReview(submissionId);

  return (
    <form onSubmit={formValues.handleSubmit} noValidate>
      {criteria.map(criterion => {
        const { key } = criterion;
        return (
          <ReviewItem
            comments={
              <Input
                label="Comments"
                name={key + "Comment"}
                rows="3"
                formValues={formValues}
              />
            }
            rating={<RatingInput name={key} formValues={formValues} />}
            key={key}
            criterion={criterion}
          />
        );
      })}
      <Separator />
      <Typography variant="h6">General Comments</Typography>
      <Input
        label="Comments"
        name={"generalComments"}
        rows="3"
        formValues={formValues}
      />
      <FormSubmit loading={loading} text="Submit Review" />
      <FormError error={err} />
    </form>
  );
};

export default ReviewForm;
