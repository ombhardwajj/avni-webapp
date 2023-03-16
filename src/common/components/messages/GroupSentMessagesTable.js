import React from "react";
import { useTranslation } from "react-i18next";
import MaterialTable from "material-table";

import { formatDate } from "../../utils/General";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(theme => ({
  expansionPanel: {
    marginBottom: "11px",
    borderRadius: "5px",
    boxShadow:
      "0px 0px 3px 1px rgba(0,0,0,0.2), 0px 1px 2px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  },
  expansionHeading: {
    fontSize: "1rem",
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "500",
    margin: "0"
  },
  expandMoreIcon: {
    color: "#0e6eff"
  }
}));

const GroupMessagesTable = ({ messages, title, showDeliveryStatus, showDeliveryDetails }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const columns = [
    {
      title: t("Group Id"),
      field: "externalId"
    },
    {
      title: t("Message Template Id"),
      field: "messageTemplateId"
    },
    {
      title: t("Scheduled DateTime"),
      field: "scheduledDateTime",
      type: "date",
      render: row => formatDate(row["scheduledDateTime"]),
      defaultSort: "desc"
    }
  ];

  if (showDeliveryStatus) {
    columns.push({
      title: t("Delivery Status"),
      field: "deliveryStatus"
    });
  }

  if (showDeliveryDetails) {
    columns.push({
      title: t("Delivered DateTime"),
      field: "deliveredDateTime",
      type: "date",
      render: row => formatDate(row["deliveredDateTime"]),
      defaultSort: "desc"
    });
  }

  return (
    <ExpansionPanel className={classes.expansionPanel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}>
        <Typography component={"span"} className={classes.expansionHeading}>
          {t(title)}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: 0, display: "block" }}>
        <MaterialTable
          title=""
          columns={columns}
          data={messages}
          options={{
            pageSize: 20,
            pageSizeOptions: [20],
            addRowPosition: "first",
            sorting: true,
            debounceInterval: 500,
            search: false,
            toolbar: false
          }}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default GroupMessagesTable;