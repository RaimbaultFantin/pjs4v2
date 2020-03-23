import React from "react";
import { Grid } from "@material-ui/core";
import GroupAvatars from "../../../../../components/GroupAvatar/GroupAvatar";
import PersonnalDrawer, {
  TextPath
} from "../../../../../components/PersonnalDrawer/PersonnalDrawer";
import FolderAvatar from "../../../../../components/FolderAvatar/FolderAvatar";

interface RightContentProps {}

/**
 * Belong to Team
 */
export default function RightDetails() {
  const textItems: Array<TextPath> = [
    new TextPath("Add members", "add-members"),
    new TextPath("Edit Theme", "edit-theme")
  ];
  const persons = ["Benjamin", "Yanis", "Oliwier", "Liuyi", "Mariam", "Fares"];

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <GroupAvatars />
        <PersonnalDrawer textsItems={textItems} />
      </Grid>
      <FolderAvatar persons={persons} />
    </div>
  );
}
