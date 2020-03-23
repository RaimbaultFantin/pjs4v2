import React, { useState } from "react";
import SimpleBottomNavigation from "../../../../../components/SimpleBottomNavigation/SimpleBottomNavigation";
import ChatTeam from "../../../../../components/ChatTeam/ChatTeam";
import Planning from "../../../../../components/Planning/Planning";

interface MainContentProps {}

/**
 * Belong to Team
 */
export default function LeftActivities() {
  const [chatOpen, setChatOpen] = useState<boolean>(true);
  const [planningOpen, setPlanningOpen] = useState<boolean>(false);
  const [teamOpen, setTeamOpen] = useState<boolean>(false);

  return (
    <div>
      <SimpleBottomNavigation
        setChatOpen={setChatOpen}
        setPlanningOpen={setPlanningOpen}
        setTeamOpen={setTeamOpen}
      />
      {chatOpen ? <ChatTeam /> : <div />}
      {planningOpen ? <Planning /> : <div />}
      {teamOpen ? <div>Hello</div> : <div />}
    </div>
  );
}
