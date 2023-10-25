import { Pageheader } from "../Pageheader";
import CommentsComponent from "./CommentsComponent";
import { CreateOffice } from "./CreateOffice";
import { CreateDesk } from "./CreateDesk";
import { UpdateOffice } from "./handleUpdateOffice";
import FixdeskComponent from "./FixdeskRequestComponent";

export const Administration: React.FC = () => {
  return (
    <div>
      <Pageheader
        users={{
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          isAdmin: false,
          department: "",
          createdAt: "",
          updatedAt: "",
        }}
      />
      <h2 className="H2">Administration Dashboard</h2>
      <FixdeskComponent />
      <CommentsComponent />
      <CreateOffice />
      <CreateDesk />
      <UpdateOffice />
    </div>
  );
};
