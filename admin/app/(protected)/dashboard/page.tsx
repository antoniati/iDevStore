import { Button } from "@tremor/react";
import { LogoutButton } from "@/components/buttons/LogoutButton";

export default function Dashboard() {
  return (
    <div style={{ padding: "100px" }}>
      Dashboard
      <LogoutButton>
        <Button type="button">
          Log Out
        </Button>
      </LogoutButton>
    </div>
  )
}