import React from "react";

export const UserContext: React.Context<any> = React.createContext({
    user: undefined,
    updateUser: () => {}
});