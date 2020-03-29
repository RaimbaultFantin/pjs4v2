import React from "react";
import { Grid } from "@material-ui/core";
import GroupAvatars from "../../../../../components/GroupAvatar/GroupAvatar";
import { TextPath } from "../../../../../components/LeftDrawer/LeftDrawer";
import FolderAvatar from "../../../../../components/FolderAvatar/FolderAvatar";
import RightDrawer from "../../../../../components/RightDrawer/RightDrawer";
import AddMembersDialog from "../../../../../components/AddMembersDialog/AddMembersDialog";
import EditMembersDialog from "../../../../../components/EditMembersDialog.tsx/EditMembersDialog";

/**
 * Belong to Team
 */
export default function RightDetails() {
  const persons = [
    "Fantin 👑",
    "Benjamin",
    "Yanis",
    "Oliwier",
    "Liuyi",
    "Mariam",
    "Fares"
  ];

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <GroupAvatars />
        <AddMembersDialog />
        <EditMembersDialog />
      </Grid>
      <FolderAvatar persons={persons} />
    </div>
  );
}
