# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-05-11 04:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crowdsourcing', '0082_merge'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='workeraccesscontrolentry',
            unique_together=set([('group', 'worker')]),
        ),
        migrations.AlterIndexTogether(
            name='project',
            index_together=set([('deadline', 'status', 'min_rating', 'deleted_at'), ('owner', 'deleted_at', 'created_at')]),
        ),
        migrations.AlterIndexTogether(
            name='requesteraccesscontrolgroup',
            index_together=set([('requester', 'type', 'is_global')]),
        ),
        migrations.AlterIndexTogether(
            name='workeraccesscontrolentry',
            index_together=set([('group', 'worker')]),
        ),
    ]
