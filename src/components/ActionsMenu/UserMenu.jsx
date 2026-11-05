import { User } from "lucide-react";
import Button from "../ui/Button";

export default function UserMenu({
  user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 010-2048",
    address: "123 Market Street, Portland, OR 97201",
  },
}) {
  return (
    <div className="flex items-center gap-4  text-card-foreground">
      <div className="flex size-32 m-6 shrink-0 items-center justify-center overflow-hidden rounded-full border-8 border-card-foreground bg-card">
        {user ? (
          <User size={72} aria-hidden="true" />
        ) : (
          <p className="text-7xl">?</p>
        )}
      </div>
      {user ? (
        <div className="flex flex-col h-full justify-between">
          <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <Button flavour="link" className="w-[90px] mt-1">
            Edit Profile
          </Button>
        </div>
      ) : (
        <div className="flex flex-col justify-end gap-10 w-full pr-2">
          <h1 className="text-3xl font-bold mb-1 w-full align-center text-center">
            Guest Account.
          </h1>

          <div className="w-full flex flex-row justify-between gap-2">
            <Button flavour="solid" className="w-full border-0">
              Login
            </Button>
            <Button flavour="solid" className="w-full border-0">
              Signup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
