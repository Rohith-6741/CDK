import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions';

export class CloudWatchForExistingEC2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const instanceId = 'i-0d66c2e57092a5926'; 

    new ssm.CfnAssociation(this, 'CWAgentInstall', {
      name: 'AWS-ConfigureAWSPackage',
      targets: [{ key: 'InstanceIds', values: [instanceId] }],
      parameters: {
        action: ['Install'],
        name: ['AmazonCloudWatchAgent'],
      },
    });

    new ssm.CfnAssociation(this, 'CWAgentConfig', {
      name: 'AmazonCloudWatch-ManageAgent',
      targets: [{ key: 'InstanceIds', values: [instanceId] }],
      parameters: {
        action: ['configure'],
        mode: ['ec2'],
      },
    });

    const alarmTopic = new sns.Topic(this, 'AlarmNotificationTopic', {
      displayName: 'EC2 CPU Alarm Notifications',
    });

   
    alarmTopic.addSubscription(new snsSubscriptions.EmailSubscription('rohithreddyyeruva629@gmail.com'));

 
    const cpuAlarm = new cloudwatch.Alarm(this, 'HighCPUAlarm', {
      metric: new cloudwatch.Metric({
        namespace: 'AWS/EC2',
        metricName: 'CPUUtilization',
        dimensionsMap: {
          InstanceId: instanceId,
        },
        statistic: 'Average',
        period: cdk.Duration.minutes(5),
      }),
      threshold: 80, 
      evaluationPeriods: 2, 
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      alarmDescription: `Alarm if CPU usage exceeds 80% for instance ${instanceId}`,
    });

    
    cpuAlarm.addAlarmAction({
      bind: () => ({ alarmActionArn: alarmTopic.topicArn }),
    });
  }
}
