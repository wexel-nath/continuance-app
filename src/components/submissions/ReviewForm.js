import React, { useState } from "react";
import Markdown from "react-markdown";
import { decamelizeKeys as toSnakeCase } from "humps";
import { isNullOrUndefined } from "util";

import { Typography, Divider, Grid } from "@material-ui/core";

import {
  Input,
  FormError,
  FormSubmit,
  RatingInput
} from "../helper/formHelpers";
import history from "../../history";
import useForm from "../../components/helper/useForm";
import { newReview } from "../../api/continuance";

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

  criteriaKeys.map(key => {
    review[key] = isNullOrUndefined(values[key])
      ? null
      : {
          score: values[key],
          comments: values[key + "Comment"] || ""
        };
  });

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

const Separator = () => {
  return <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />;
};

const ReviewItem = ({ criterion, formValues }) => {
  const { title, description, key } = criterion;

  return (
    <>
      <Separator />
      <Grid container direction="row" justify="space-between">
        <Grid item xs={9}>
          <Typography variant="h6">{title}</Typography>
          <Markdown source={description} />
        </Grid>
        <Grid item>
          <Typography variant="h6">Score</Typography>
          <RatingInput name={key} formValues={formValues} />
        </Grid>
        <Grid item xs={12}>
          <Input
            label="Comments"
            name={key + "Comment"}
            rows="3"
            formValues={formValues}
          />
        </Grid>
      </Grid>
    </>
  );
};

const ReviewForm = ({ submissionId, criteria }) => {
  const [formValues, err, loading] = useNewReview(submissionId);

  return (
    <form onSubmit={formValues.handleSubmit} noValidate>
      {criteria.map(criterion => (
        <ReviewItem
          key={criterion.key}
          criterion={criterion}
          formValues={formValues}
        />
      ))}
      <FormSubmit loading={loading} text="Submit Review" />
      <FormError error={err} />
    </form>
  );
};

export default ReviewForm;
