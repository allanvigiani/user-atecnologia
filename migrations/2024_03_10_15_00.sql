\c atecnologia;

-- CreateTable
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "address" VARCHAR(250),
    "contact_phone" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_key" ON "user"("id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_key" ON "user"("email");

CREATE TABLE IF NOT EXISTS "user_sessions" (
    "id" SERIAL NOT NULL,
    "start_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_login" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "token" TEXT,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;