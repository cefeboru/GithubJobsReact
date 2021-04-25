import type { JobDTO } from "../../api";
import { formatDistance } from "date-fns";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TypoGraphy from '@material-ui/core/Typography';

interface JobProps {
  job: JobDTO;
  className?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

const Job = (props: JobProps) => {
  const { title, location, type, company, created_at } = props.job;
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${props.className}`}>
      <div className={classes.paper}>
        <Grid container direction="column" justify="space-between">
          <Grid container direction="row" justify="flex-end" >
            <Grid container item direction="column" xs>
              <Grid item xs={6}>
                <TypoGraphy>{title}</TypoGraphy>
              </Grid>
              <Grid>
                <div>
                  {company} - {type}
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="column"
              alignItems="flex-end"
              xs
            >
              <Grid item xs={6}>
                <div>{location}</div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  {formatDistance(new Date(created_at), new Date(), {
                    addSuffix: true,
                  })}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Job;
