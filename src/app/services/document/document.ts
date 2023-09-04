export interface Document {
    id_document: string; // Change from number to string
    titreDocument: string; // Use 'titreDocument' instead of 'description'
    fichier: File | null; // Use 'File | null' to allow nullable value
    entrepriseId: number; //de l'entreprise
     document_status : String;
  }
  