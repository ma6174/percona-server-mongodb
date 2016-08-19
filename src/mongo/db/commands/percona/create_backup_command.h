/* -*- mode: C++; c-basic-offset: 4; indent-tabs-mode: nil -*- */
// vim: ft=cpp:expandtab:ts=8:sw=4:softtabstop=4:
/*======
This file is part of Percona Server for MongoDB.

Copyright (c) 2006, 2016, Percona and/or its affiliates. All rights reserved.

    Percona Server for MongoDB is free software: you can redistribute
    it and/or modify it under the terms of the GNU Affero General
    Public License, version 3, as published by the Free Software
    Foundation.

    Percona Server for MongoDB is distributed in the hope that it will
    be useful, but WITHOUT ANY WARRANTY; without even the implied
    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public
    License along with Percona Server for MongoDB.  If not, see
    <http://www.gnu.org/licenses/>.
======= */

#include "mongo/db/commands.h"

namespace mongo {
    namespace percona {
        class CreateBackupCommand : public Command {
        public:
            CreateBackupCommand(const char *name) : Command("createBackup") {}
            virtual void help(std::stringstream &h) const;
            virtual void addRequiredPrivileges(const std::string& dbname,
                                               const BSONObj& cmdObj,
                                               std::vector<Privilege>* out);
            virtual bool isWriteCommandForConfigServer() const { return false;}
            virtual bool adminOnly() const { return true; }
            virtual bool slaveOk() const { return true; }
            virtual bool run(mongo::OperationContext* txn,
                             const std::string &db,
                             BSONObj &cmdObj,
                             int options,
                             std::string &errmsg,
                             BSONObjBuilder &result);
        };
    }
}
