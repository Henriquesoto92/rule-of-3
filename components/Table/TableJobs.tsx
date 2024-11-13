// TableJobs.tsx
import { Add, ArchiveBook, Edit2, Trash } from 'iconsax-react';
import { Button, Flex, Table } from '@mantine/core';
import { IJob } from './types';

interface TableJobsProps {
  data: IJob[];
  deleteRow: (id: number) => void;
  openEditModal: (job: IJob) => void;
  openProcessHistoryModal: (job: IJob) => void;
}

export function TableJobs({
  data,
  deleteRow,
  openEditModal,
  openProcessHistoryModal,
}: TableJobsProps) {
  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.jobTitle}</Table.Td>
      <Table.Td>
        <a href={row.link} target="_blank" rel="noopener noreferrer">
          {row.company}
        </a>
      </Table.Td>
      <Table.Td>{row.contact}</Table.Td>
      <Table.Td>{row.applicationDate}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
      <Table.Td>{row.resumeUsed}</Table.Td>
      <Table.Td>
        <Flex gap="16px">
          <Button variant="subtle" onClick={() => deleteRow(row.id)}>
            <Trash size="24px" color="#a10000" />
          </Button>
          <Button variant="subtle" onClick={() => openEditModal(row)}>
            <Edit2 size="24px" color="#FF8A65" />
          </Button>
          <Button variant="subtle" onClick={() => openProcessHistoryModal(row)}>
            <ArchiveBook size="24px" color="#4B9DFF" />
          </Button>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table w="80%">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome da Vaga</Table.Th>
          <Table.Th>Empresa (Link)</Table.Th>
          <Table.Th>Contato</Table.Th>
          <Table.Th>Data de Candidatura</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Currículo Usado</Table.Th>
          <Table.Th>Opções</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
