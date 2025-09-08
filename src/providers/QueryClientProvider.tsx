"use client";

import React, { useState } from "react";
import {
    QueryClient,
    QueryClientProvider as RQueryClientProvider,
} from "@tanstack/react-query";


function QueryClientProvider({
                                 children,

                             }: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <RQueryClientProvider client={queryClient}>
            {children}

        </RQueryClientProvider>
    );
}

export default QueryClientProvider;