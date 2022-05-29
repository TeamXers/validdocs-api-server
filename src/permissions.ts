import { setPermissions } from "@eunovo/superbackend";

setPermissions({
    accounts: {
        create: { owner: true },
        read: { owner: true },
        update: { owner: true },
        delete: { owner: true }
    },
    documents: {
        create: { owner: true },
        read: { owner: true },
        update: { owner: true },
        delete: { owner: true }
    }
});
