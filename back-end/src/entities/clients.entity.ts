import { Column, CreateDateColumn, 
    DeleteDateColumn, Entity,
    OneToMany, PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm"
import Contacts from "./contacts.entity"

@Entity("clients")
class Clients {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    fullName: string

    @Column({ unique: true })
    email: string

    @Column()
    phone: string

    @CreateDateColumn({ type: "date" })
    createdOn: Date

    @UpdateDateColumn({ type: "date" })
    updatedAt: Date

    @DeleteDateColumn({ type: "date" })
    deletedAt: Date

    @OneToMany(() => Contacts, contacts => contacts.client)
    contacts: Contacts[]
}

export default Clients