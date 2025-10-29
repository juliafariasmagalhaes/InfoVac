import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

const UBSTableView = ({ searchResults }) => {
  if (searchResults.length === 0) return null;

  // Obter lista única de vacinas de todas as UBSs
  const vaccinesList = Array.from(
    new Set(
      searchResults.flatMap(ubs => Object.keys(ubs.vaccines || {}))
    )
  ).sort();

  return (
    <Card className="glass-card border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/80">
          <TableRow>
            <TableHead className="w-[240px]">UBS</TableHead>
            <TableHead className="w-[180px]">Endereço</TableHead>
            {vaccinesList.map(vaccine => (
              <TableHead key={vaccine} className="text-center">
                {vaccine}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchResults.map((ubs) => (
            <TableRow key={ubs.id} className="hover:bg-gray-50/80">
              <TableCell className="font-medium">{ubs.name}</TableCell>
              <TableCell className="text-gray-600">{ubs.address}</TableCell>
              {vaccinesList.map(vaccine => (
                <TableCell key={vaccine} className={`text-center ${!ubs.vaccines[vaccine] ? 'bg-red-50' : ''}`}>
                  {ubs.vaccines[vaccine] ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UBSTableView; 