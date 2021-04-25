import { useEffect, useState } from "react";
import { searchJobs } from "../../api";
import type { SearchJobsResponseData, JobDTO } from "../../api";
import { useApi } from "../../hooks/useApi";
import Job from "../Job";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProgrammingLanguageSelect from "../ProgrammingLanguageSelect";
import CitySelect from "../CitySelect";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  jobsList: {
    paddingTop: theme.spacing(4),
  },
  job: {
    "&:not(:last-child)": {
      borderBottom: "1px solid",
    },
  },
  loaderContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerLoader: {
    paddingTop: "25px",
  },
  pageTitle: {
    paddingBottom: theme.spacing(2),
  },
  selectsContainer: {
    paddingBottom: theme.spacing(2),
  }
}));

const JobsBoard = () => {
  const [page] = useState(0);
  const [params, setParams] = useState<any>({
    query: {
      page,
    },
  });
  const [isLoading, hasLoaded, data, error] = useApi<SearchJobsResponseData>(
    searchJobs,
    params
  );
  const [jobs, setJobs] = useState<Array<JobDTO>>([] as any);
  const classes = useStyles();

  useEffect(() => {
    if (!isLoading && data) {
      setJobs(data.items);
    }
  }, [isLoading, data]);

  if (isLoading && !hasLoaded) {
    return (
      <Container className={classes.loaderContainer}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Container maxWidth="md">Error: {error}</Container>;
  }

  return (
    <Container maxWidth="md" className={classes.jobsList}>
      <Typography className={classes.pageTitle} variant="h6">Search jobs from Github's public API</Typography>
      <Grid className={classes.selectsContainer} container spacing={2} justify="center">
        <Grid item xs>
          <ProgrammingLanguageSelect
            onChange={handleSelectChange("description")}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs>
          <CitySelect
            onChange={handleSelectChange("city")}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
      {jobs.map((job) => (
        <Job className={classes.job} key={job.id} job={job} />
      ))}
      {isLoading && (
        <Grid
          container
          item
          xs={12}
          spacing={2}
          justify="center"
          className={classes.innerLoader}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {jobs.length === 0 && !isLoading && hasLoaded && (
        <Grid
          container
          item
          xs={12}
          spacing={2}
          justify="center"
          className={classes.innerLoader}
        >
          <Typography>No jobs matched your search</Typography>
        </Grid>
      )}
    </Container>
  );

  function handleSelectChange(name: string) {
    return function (newValue: string) {
      if (params.query[name] !== newValue) {
        setJobs([]);
        setParams({
          query: {
            ...params.query,
            [name]: newValue,
          },
        });
      }
    };
  }
};

export default JobsBoard;
