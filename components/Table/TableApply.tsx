'use client';

import { useState } from 'react';
import { Add } from 'iconsax-react';
import { Button, Flex } from '@mantine/core';
import { initialData } from './mockData';
import { ModalProcessHistory } from './ModalProcessHistory';
import { ModalRegisterEdit } from './ModalRegisterEdit';
import { TableJobs } from './TableJobs';
import { IJob, IProcessHistory } from './types';

export function TableApply() {
  const [data, setData] = useState<IJob[]>(initialData);
  const [modalOpened, setModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [historyModalOpened, setHistoryModalOpened] = useState(false);
  const [editingJob, setEditingJob] = useState<IJob | null>(null);
  const [currentHistory, setCurrentHistory] = useState<IProcessHistory | null>(
    {} as IProcessHistory
  );

  const deleteRow = (id: number) => {
    setData(data.filter((row) => row.id !== id));
  };

  const openEditModal = (job: IJob) => {
    setEditingJob(job);
    setEditModalOpened(true);
  };

  const openHistoryModal = (job: IJob) => {
    setCurrentHistory(null);
    setEditingJob(job);
    setHistoryModalOpened(true);
  };

  const handleAddJob = (job: IJob) => {
    setData([...data, { ...job, id: data.length + 1 }]);
    setModalOpened(false);
  };

  const handleEditJob = (job: IJob) => {
    setData(data.map((row) => (row.id === job.id ? job : row)));
    setEditModalOpened(false);
    setEditingJob(null);
  };

  const handleAddHistory = (history: IProcessHistory) => {
    if (editingJob) {
      setData(
        data.map((job) =>
          job.id === editingJob.id
            ? { ...job, processHistory: [...job.processHistory, history] }
            : job
        )
      );
      setHistoryModalOpened(false);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      <Button
        leftSection={<Add size="32" color="#3bf275" />}
        onClick={() => setModalOpened(true)}
        mb="16px"
      >
        Adicionar Nova Vaga
      </Button>

      <TableJobs
        data={data}
        deleteRow={deleteRow}
        openEditModal={openEditModal}
        openProcessHistoryModal={openHistoryModal}
      />

      {historyModalOpened && (
        <ModalProcessHistory
          opened={historyModalOpened}
          onClose={() => setHistoryModalOpened(false)}
          onSubmit={handleAddHistory}
        />
      )}
      {modalOpened && (
        <ModalRegisterEdit
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onSubmit={handleAddJob}
        />
      )}
      {editingJob && (
        <ModalRegisterEdit
          opened={editModalOpened}
          onClose={() => setEditModalOpened(false)}
          onSubmit={handleEditJob}
          defaultValues={editingJob}
        />
      )}
    </Flex>
  );
}
